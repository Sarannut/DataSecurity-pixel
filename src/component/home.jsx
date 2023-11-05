import React, { useRef, useState } from "react";
import "./home.css";
function Home() {
  const [selectedOption, setSelectedOption] = useState("encrypt");
  const fileInputRef = useRef(null);
  const [imgSrc, setImgSrc] = useState("");
  const [file, setFile] = useState(null);
  const [images, setImages] = useState({});
  const [uploadedImage, setUploadedImage] = useState(false);
  const [keydecrypt, setKeydecrypt] = useState("");
  const [inputValue, setInputValue] = useState(""); 

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    setImgSrc("");
    setFile(null);
    setKeydecrypt("");
    setInputValue("");
    setImages("");
  };

  const copyImage = () => {
    const img = new Image();
    img.src = `data:image/png;base64, ${images.encrypted_image}`;

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      context.drawImage(img, 0, 0);
      canvas.toBlob((blob) => {
        const item = new ClipboardItem({ "image/png": blob });
        navigator.clipboard.write([item]).then(() => {
          alert("รูปภาพถูกคัดลอกไปยังคลิปบอร์ดแล้ว");
        });
      }, "image/png");
    };
  };

  const handleCopy = () => {
    const textToCopy = keydecrypt;
    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    alert("คีย์ถูกคัดลอกไปยังคลิปบอร์ดแล้ว");
  };

  const validateKeyInput = (e) => {
    const keyInput = e.target.value;

    // ตรวจสอบว่า key มีเฉพาะตัวอักษรและตัวเลขเท่านั้น
    if (/^[a-zA-Z]+$/.test(keyInput)) {
      // สามารถใส่ตัวอักษรและตัวเลข
    } else {
      alert("กรุณาใส่คีย์ที่มีตัวอักษรเท่านั้น");
      e.target.value = "";
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const fileExtension = selectedFile.name.split(".").pop().toLowerCase();
      if (fileExtension === "png" || fileExtension === "jpg") {
        setFile(selectedFile);
        setImgSrc(URL.createObjectURL(selectedFile));
      } else {
        alert("กรุณาเลือกไฟล์รูปภาพที่มีนามสกุล .png หรือ .jpg เท่านั้น");
      }
    }
  };
  const handleFileUpload = () => {
    if (file) {
      setUploadedImage(true);
      const formData = new FormData();
      formData.append("image", file);

      const keyInput = document.querySelector(".vuluekey1");
      const key = keyInput.value;

      // ตรวจสอบว่า key มีเฉพาะตัวอักษร
      if (/^[a-zA-Z]+$/.test(key) && key.length > 0) {
        formData.append("key", key);
        rsa(key);
        fetch("http://localhost:5000/process_image", {
          method: "POST",
          body: formData,
        })
          .then((res) => res.json())
          .then((result) => {
            setImages(result);
            console.log("Result:", result);
            console.log("Images:", images);
            console.log("Result:", result);
            if (result["status"] === "ok") {
              // อัปโหลดไฟล์เสร็จสมบูรณ์
            }
          });
      } else {
        alert("กรุณาใส่คีย์ที่มีตัวอักษรเท่านั้น และไม่เป็นค่าว่าง");
      }
    }
  };

  function isPrime(number) {
    if (number <= 1) return false;
    if (number <= 3) return true;
    if (number % 2 === 0 || number % 3 === 0) return false;
    for (let i = 5; i * i <= number; i += 6) {
      if (number % i === 0 || number % (i + 2) === 0) return false;
    }
    return true;
  }

  function getRandomE(p, q) {
    const n = p * q;
    const phi = (p - 1) * (q - 1);
    let e;
    do {
      e = Math.floor(Math.random() * phi);
    } while (gcd(e, phi) !== 1);
    return e;
  }

  function gcd(a, b) {
    if (b === 0) {
      return a;
    }
    return gcd(b, a % b);
  }

  function KeyEncrypt(p, q, e, text) {
    const n = p * q;
    console.log(p, q, e, text, n);
    const phi = (p - 1) * (q - 1);
    const check = gcd_rec(e, phi);
    function gcd_rec(a, b) {
      if (b) {
        return gcd_rec(b, a % b);
      } else {
        return Math.abs(a);
      }
    }
    let result = " ";
    if (check == 1) {
      const aiis = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      for (let i = 0; i < text.length; i++) {
        const char = text[i].toUpperCase();
        const indextext = aiis.indexOf(char);
        result += BigInt(indextext) ** BigInt(e) % BigInt(n);

        if (i < text.length - 1) {
          result += "-";
        }
      }
    }
    return result;
  }

  const rsa = (text) => {
    let p, q;
    let keyen = "";
    let randomNumber;
    do {
      randomNumber = Math.floor(Math.random() * 50) + 1;
    } while (!isPrime(randomNumber));
    keyen += `(p, ${randomNumber})`;
    p = randomNumber;
    do {
      randomNumber = Math.floor(Math.random() * 50) + 1;
    } while (!isPrime(randomNumber));
    keyen += `(q, ${randomNumber})`;
    q = randomNumber;

    const e = getRandomE(p, q);
    keyen += `(e, ${e})`;

    keyen += KeyEncrypt(p, q, e, text);
    setKeydecrypt(keyen);
  };

  return (
    <div className="container">
      <div className="block">
        <div className="button22">
          <label className="button-en">
            <input
              type="radio"
              value="encrypt"
              checked={selectedOption === "encrypt"}
              onChange={handleOptionChange}
            />
            Encrypt
          </label>
          <label className="button-de">
            <input
              type="radio"
              value="decrypt"
              checked={selectedOption === "decrypt"}
              onChange={handleOptionChange}
            />
            Decrypt
          </label>
        </div>

        <input
          type="file"
          accept=".png, .jpg"
          onChange={handleFileChange}
          ref={fileInputRef}
          style={{ display: "none" }}
        />

        <button
          className="blockim"
          onClick={() => fileInputRef.current.click()}
        >
          {imgSrc ? (
            <img
              src={imgSrc}
              alt="Selected Image"
              style={{ width: "350px", height: "350px", borderRadius: "50%" }}
            />
          ) : (
            <i
              className="material-icons"
              style={{ fontSize: "100px", color: "#fff" }}
            >
              image
            </i>
          )}
          <br></br>
          <small style={{ fontSize: "30px", color: "#fff" }}>
            Upload Image
          </small>
        </button>

        <div className="line"></div>
        <div className="key">
          <div className="namekey">
            <p className="namekey1">Key:</p>
          </div>
          <div className="vuluekey">
            <input
              className="vuluekey1"
              type="text"
              onInput={validateKeyInput}
              pattern="[A-Za-z]+"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </div>
          <div className="submidkey">
            <button className="submidkey1" onClick={handleFileUpload}>
              Submit
            </button>
          </div>
        </div>
      </div>
      <div className="block1">
        <div className="button">
          <button className="button-im">
            <a
              className="button-im2"
              download="image.png"
              href={`data:image/png;base64, ${images.encrypted_image}`}
            >
              <i className="material-icons" style={{ fontSize: "25px" }}>
                download
              </i>
              &nbsp;&nbsp;download
            </a>
          </button>
          <button className="button-im" onClick={copyImage}>
            <i className="material-icons" style={{ fontSize: "30px" }}>
              content_copy
            </i>
            &nbsp;&nbsp;copy
          </button>
        </div>
        <div className="showim">
          {uploadedImage &&
            (selectedOption === "encrypt" ? (
              // ถ้าคลิก Encrypt
              <img
                src={`data:image/png;base64, ${images.encrypted_image}`}
                alt="Encrypted"
                style={{ width: "350px", height: "350px", borderRadius: "50%" }}
              />
            ) : (
              // ถ้าคลิก Decrypt
              <img
                src={`data:image/png;base64, ${images.encrypted_image}`}
                alt="Decrypted"
                style={{ width: "350px", height: "350px", borderRadius: "50%" }}
              />
            ))}
        </div>

        <div className="line"></div>
        {selectedOption === "encrypt" && (
          <div className="key">
            <div className="namekey-1">
              <p className="namekey1-1">Key:</p>
            </div>
            <div className="vuluekey-1">
              <div className="scrollable-text">
                <p className="vuluekey1-1">{keydecrypt}</p>
              </div>
            </div>
            <div className="submidkey-1">
              <button className="submidkey1-1" onClick={handleCopy}>
                <i className="material-icons" style={{ fontSize: "30px" }}>
                  content_copy
                </i>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
