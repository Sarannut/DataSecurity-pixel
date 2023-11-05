from flask import Flask, request, jsonify, url_for
import cv2
import numpy as np
import base64
import hashlib

from flask_cors import CORS

app = Flask(__name__)
CORS(app)


def xor_encrypt_decrypt(image, key):
    image_np = np.array(image)
    key_np = np.array(key)
    
    key_np = np.resize(key_np, image_np.shape)
    
    result = np.bitwise_xor(image_np, key_np)
    return result

@app.route('/process_image', methods=['POST'])
def process_image():
    
    image_data = request.files['image']
    image = cv2.imdecode(np.frombuffer(image_data.read(), np.uint8), cv2.IMREAD_COLOR)
    image_height, image_width, _ = image.shape
    if image_data:

        key_input = request.form.get('key')
        print(key_input)

        key_bytes = key_input.encode('utf-8')

        key = hashlib.sha256(key_bytes).digest()

        key = key.ljust(image_height * image_width, b'\x00')

        while len(key) < image_height * image_width:
            key += hashlib.sha256(key).digest()

        key = key[:image_height * image_width]
        original_key = key
        reduced_key = []

        while len(reduced_key) < image_height * image_width:
            for _ in range(100):  # เพิ่มทีละ 100 ครั้งต่อรอบ
                original_key = hashlib.sha256(original_key).digest()
            reduced_key_str = hashlib.sha256(original_key).hexdigest()
            reduced_key.extend([int(reduced_key_str[i:i+2], 16) for i in range(0, len(reduced_key_str), 2)])

        reduced_key = reduced_key[:image_height * image_width]

        encrypted_image = xor_encrypt_decrypt(image, reduced_key)
        decrypted_image = xor_encrypt_decrypt(encrypted_image, reduced_key)

        encrypted_image_base64 = base64.b64encode(cv2.imencode('.png', encrypted_image)[1]).decode()
        decrypted_image_base64 = base64.b64encode(cv2.imencode('.png', decrypted_image)[1]).decode()
        print(encrypted_image_base64)

        result = {
            'encrypted_image': encrypted_image_base64,
            'decrypted_image': decrypted_image_base64,
        }
        return jsonify(result)
    else :
        return jsonify({'error': 'No image provided'})

if __name__ == '__main__':
    app.run(debug=True)
