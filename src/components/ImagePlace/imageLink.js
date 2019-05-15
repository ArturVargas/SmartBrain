import React from 'react';


const ImageLink = ({ onInputChange, onSubmit }) => {
    return(
        <div>
            <p className='f3'> 
                { ' This Magic Brain Detect Faces in your pictures ' }
            </p>
          <div className='pa4 br3 shadow-5'>
              <input className='f4 pa2 w-60 center' type='text' onChange={onInputChange} />
              <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple' onClick={onSubmit}> Detect </button>
          </div>
        </div>
    );
}

export default ImageLink;