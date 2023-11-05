import React, { useState } from 'react';
import './rsa.css'

function Rsa() {
  const [resulten, setResulten] = useState('');
  const [en, setEn] = useState({
    p: '',
    q: '',
    e: '',
    text: '',
  });
  const [resultde, setResultde] = useState('');
  const [de, setDe] = useState({
    p: '',
    q: '',
    e: '',
    text: '',
  });

  function isPrime(number) {
    if (number <= 1) return false;
    if (number <= 3) return true;
    if (number % 2 === 0 || number % 3 === 0) return false;
    for (let i = 5; i * i <= number; i += 6) {
      if (number % i === 0 || number % (i + 2) === 0) return false;
    }
    return true;
  }

  const handleChangeEn = (e) => {
    const { name, value } = e.target;
    setEn({ ...en, [name]: value });
  };

  function gcd_rec(a, b) {
    if (b) {
        return gcd_rec(b, a % b);
    } else {
        return Math.abs(a);
    }
  }

  const handleSubmiten = () => {
    const { p, q, e, text } = en; 
    if(!isPrime(p)){
      alert("กรุณาใส่จำนวนเฉพาะใน p")
      return;
    }
    if (!/^[0-9 ]+$/.test(p)) {
      alert("กรุณาใส่ตัวเลขเท่านั้นใน p");
      return;
    }
    if(!isPrime(q)){
      alert("กรุณาใส่จำนวนเฉพาะใน q")
      return
    }
    if (!/^[0-9 ]+$/.test(q)) {
      alert("กรุณาใส่ตัวเลขเท่านั้นใน q");
      return;
    }
    if (!/^[0-9 ]+$/.test(e)) {
      alert("กรุณาใส่ตัวเลขเท่านั้นใน e");
      return;
    }
    const n = p * q;
    const phi = (p - 1) * (q - 1);
    const check = gcd_rec(e, phi);
    if (/^[a-zA-Z ]+$/.test(text)) {
    } else {
      alert("กรุณาใส่ text ที่แต่มีตัวอักษรเท่านั้น");
      return
    }
    
    let result = " ";
    setResulten(result);
    if(check==1){
      const aiis = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      
      for (let i = 0; i < text.length; i++) {
        let indextext = text[i]
          if (/^[a-zA-Z]+$/.test(indextext)) {
            console.log("in")
            indextext = aiis.indexOf(indextext.toUpperCase());
          }
          result += (BigInt(indextext) ** BigInt(e)) % BigInt(n);
          if(i<text.length-1){
            result+="-"
          }
      }
    }else{
        alert("กรุณาใส่จำนวนที่เป็น ห.ร.ม. ของ "+phi)
        return
    }
  setResulten(result);
}
const handleChangeDe = (e) => {
  const { name, value } = e.target;
  setDe({ ...de, [name]: value });
};

const handleSubmitde = () => {
  const { p, q, e, text } = de; 
  if(!isPrime(p)){
    alert("กรุณาใส่จำนวนเฉพาะใน p")
    return;
  }
  if (!/^[0-9 ]+$/.test(p)) {
    alert("กรุณาใส่ตัวเลขเท่านั้นใน p");
    return;
  }
  if(!isPrime(q)){
    alert("กรุณาใส่จำนวนเฉพาะใน q")
    return
  }
  if (!/^[0-9 ]+$/.test(q)) {
    alert("กรุณาใส่ตัวเลขเท่านั้นใน q");
    return;
  }
  if (!/^[0-9 ]+$/.test(e)) {
    alert("กรุณาใส่ตัวเลขเท่านั้นใน e");
    return;
  }
  if (!/^[0-9- ]+$/.test(text)) {
    alert("กรุณาใส่เลขและอักษร - เท่านั้น");
    return
  }
  const n = p * q;
  const phi = (p - 1) * (q - 1);
  const check = gcd_rec(e, phi);
  let result = "   ";
  if(check==1){
    const aiis = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const textsp = text.split("-");
    let d = 1 ;
    let check = (d * e) % phi
    while(check!=1){
      d++
      check = (d * e) % phi
    }
    for (let i = 0; i < textsp.length; i++) {
      console.log(textsp[i])
        const intermediateResult = ((BigInt(textsp[i]) ** BigInt(d)) % BigInt(n))
        if(intermediateResult>25){
          result += intermediateResult ;
        }else
        result +=  aiis[intermediateResult];
    }
    setResultde(result);
  }else{
    alert("กรุณาใส่จำนวนที่เป็น ห.ร.ม. ของ "+phi)
    return

  }
}
const Copyde = () => {
  navigator.clipboard.writeText(resultde)
    .then(() => {
      console.log('คัดลอกเสร็จสมบูรณ์');
    })
    .catch((err) => {
      console.error('มีข้อผิดพลาดในการคัดลอก:', err);
    });
}
const Copyen = () => {
  navigator.clipboard.writeText(resulten)
    .then(() => {
      console.log('คัดลอกเสร็จสมบูรณ์');
    })
    .catch((err) => {
      console.error('มีข้อผิดพลาดในการคัดลอก:', err);
    });
}


  return (
    <div className='containerrsa'>
      <div className='blockrsa'>
      <div className='titlersa' style={{ backgroundColor: '#BFC8D7', display: 'flex', marginTop: 10, alignItems: 'center',justifyContent:'center' }}>
          <p style={{ fontSize: '24px'}}>Encrypt</p>
         
        </div>
        <div className='title custom-backgrounden' style={{ display: 'flex', marginTop: 10, alignItems: 'center' }}>
            <p style={{ fontSize: '20px', marginLeft: 30,marginRight :30 }}>p :</p>
            <input
              type='text'
              name='p'
              value={en.p}
              onChange={handleChangeEn}
            />
          </div>
        <div className='title custom-backgrounden' style={{ display: 'flex', marginTop: 10, alignItems: 'center' }}>
          <p style={{ fontSize: '20px', marginLeft: 30,marginRight :30 }}>q :</p>
          <input
            type='text'
            name='q'
            value={en.q}
            onChange={handleChangeEn}
          />
        </div>
        <div className='title custom-backgrounden' style={{ display: 'flex', marginTop: 10, alignItems: 'center' }}>
          <p style={{ fontSize: '20px', marginLeft: 30 ,marginRight :30}}>e :</p>
          <input
            type='text'
            name='e'
            value={en.e}
            onChange={handleChangeEn}
          />
        </div>
        <div className='title custom-backgrounden' style={{ display: 'flex', marginTop: 10, alignItems: 'center' }}>
          <p style={{ fontSize: '20px', marginLeft: 30,marginRight :8 }}>text :</p>
          <input
            type='text'
            name='text'
            value={en.text}
            onChange={handleChangeEn}
          />
        </div>
        <div className='titlersa' style={{ display: 'flex', marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
          <button class="submitrsa" type='submit' onClick={handleSubmiten} style={{ backgroundColor: '#BFC8D7',fontSize:20}}>Submit</button>
        </div>
        <div className='linelong'></div>
        <div className='title custom-backgrounden ' style={{ backgroundColor: '#EBEBEB', display: 'flex', marginTop: 30, alignItems: 'center' }}>
  <p style={{ fontSize: '20px', marginLeft: 30,flex:1 }}>Key : </p>
  <p style={{ fontSize: '20px', marginLeft: 15,flex:6,overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{resulten}</p>
  <i className="material-icons" style={{ fontSize: "30px", cursor: "pointer", marginLeft: 'auto',marginRight:10}} onClick={Copyen}>
        content_copy
      </i>
</div>

      </div>
      <div className='blockrsa'>
      <div className='titlersa' style={{ backgroundColor: '#E2D2D2', display: 'flex', marginTop: 10, alignItems: 'center',justifyContent:'center' }}>
          <p style={{ fontSize: '24px'}}>Decrypt</p>
         
        </div>
      <div className='title custom-backgroundde' style={{ display: 'flex', marginTop: 10, alignItems: 'center' }}>
          <p style={{ fontSize: '20px', marginLeft: 30,marginRight :30  }}>p :</p>
          <input
            type='text'
            name='p'
            value={de.p}
            onChange={handleChangeDe}
          />
        </div>
        <div className='title custom-backgroundde' style={{ display: 'flex', marginTop: 10, alignItems: 'center' }}>
          <p style={{ fontSize: '20px', marginLeft: 30,marginRight :30  }}>q :</p>
          <input
            type='text'
            name='q'
            value={de.q}
            onChange={handleChangeDe}
          />
        </div>
        <div className='title custom-backgroundde' style={{ display: 'flex', marginTop: 10, alignItems: 'center' }}>
          <p style={{ fontSize: '20px', marginLeft: 30,marginRight :30  }}>e :</p>
          <input
            type='text'
            name='e'
            value={de.e}
            onChange={handleChangeDe}
          />
        </div>
        <div className='title custom-backgroundde' style={{ display: 'flex', marginTop: 10, alignItems: 'center' }}>
          <p style={{ fontSize: '20px', marginLeft: 30,marginRight :8  }}>text :</p>
          <input
            type='text'
            name='text'
            value={de.text}
            onChange={handleChangeDe}
          />
        </div>
        <div className='titlersa' style={{ display: 'flex', marginTop: 20, alignItems: 'center', justifyContent: 'center' }}>
          <button class="submitrsa" type='submit' onClick={handleSubmitde} style={{ backgroundColor: '#E2D2D2',fontSize:20}}>Submit</button>
        </div>
        <div className='linelong'></div>
        <div className='title custom-backgroundde' style={{ backgroundColor: '#EBEBEB', display: 'flex', marginTop: 30, alignItems: 'center' }}>
        <p style={{ fontSize: '20px', marginLeft: 30,flex:1 }}>Key : </p>
          <p style={{ fontSize: '20px', marginLeft: 15,flex:6,overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{resultde}</p>
          <i className="material-icons" style={{ fontSize: "30px", cursor: "pointer", marginLeft: 'auto',marginRight:10}} onClick={Copyde}>
        content_copy
      </i>
        </div>  
      </div>
    </div>
  );
}

export default Rsa;
