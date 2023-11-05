import React from 'react';
import './member.css';

class MemberComponent extends React.Component {
  render() {
    return (
      <div className="containermem">
        <div className="rectanglemem rectangle-1mem"></div>
        <div className="rectanglemem rectangle-2mem"></div>
        <div className="rectanglemem rectangle-3mem"></div>
        <div className="rectanglemem rectangle-4mem"></div>
        <div className="rectanglemem rectangle-5mem"></div>
        <div className="rectanglemem rectangle-8mem"></div>
        <div className="rectanglemem rectangle-9mem"></div>
        <div className="rectanglemem rectangle-10mem"></div>
        <div className="containermem">
          <div className="image-1mem"></div> {/* Add image 1 */}
          <div className="image-2mem"></div> {/* Add image 2 */}
          <div className="image-3mem"></div> {/* Add image 3 */}
          <div className="line-1mem"></div>
          <div className="line-2mem"></div>
          <div className="line-3mem"></div>
          <p style={{ position: 'absolute', width: '197px', height: '102px', left: '166px', top: '452px', fontFamily: 'Piazzolla', fontStyle: 'normal', fontWeight: 400, fontSize: '36px', lineHeight: '51px', textAlign: 'center', color: '#000000' }}>Preechaya Chittakasem</p>
          <p style={{ position: 'absolute', width: '203px', height: '51px', left: '163px', top: '585px', fontFamily: 'Piazzolla', fontStyle: 'normal', fontWeight: 400, fontSize: '36px', lineHeight: '51px', textAlign: 'center', color: '#000000' }}>6320502444</p>
          <p style={{ position: 'absolute', width: '150px', height: '102px', left: '645px', top: '452px', fontFamily: 'Piazzolla', fontStyle: 'normal', fontWeight: 400, fontSize: '36px', lineHeight: '51px', textAlign: 'center', color: '#000000' }}>Sarannut Luanapa</p>
          <p style={{ position: 'absolute', width: '197px', height: '51px', left: '621px', top: '585px', fontFamily: 'Piazzolla', fontStyle: 'normal', fontWeight: 400, fontSize: '36px', lineHeight: '51px', textAlign: 'center', color: '#000000' }}>6320502517</p>
          <p style={{ position: 'absolute', width: '146px', height: '102px', left: '1102px', top: '452px', fontFamily: 'Piazzolla', fontStyle: 'normal', fontWeight: 400, fontSize: '36px', lineHeight: '51px', textAlign: 'center', color: '#000000' }}>Kittipat Chofha</p>
          <p style={{ position: 'absolute', width: '205px', height: '51px', left: '1072px', top: '585px', fontFamily: 'Piazzolla', fontStyle: 'normal', fontWeight: 400, fontSize: '36px', lineHeight: '51px', textAlign: 'center', color: '#000000' }}>6320502983</p>
        </div>
      </div>
    );
  }
}

export default MemberComponent;
