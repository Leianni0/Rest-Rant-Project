const React = require('react')
const Def = require('../default.jsx')

function edit_form (data) {
    return (
        <Def>
          <h1>Add a New Place</h1>
                <form action='/places' method='POST'>
                    <div className='mb-3'>
                        <label htmlFor='name'>Place Name</label>
                        <input 
                        type='text' 
                        name='name' 
                        id='name' 
                        value={data.place.name} 
                        className='form-control'
                        required />
                    </div>

                    <div className='mb-3'>
                        <label htmlFor='pic'>Place Picture</label>
                        <input type='url' name='pic' id='pic' className='form-control' />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='city'>City</label>
                        <input type='text' name='city' id='city' className='form-control' />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='state'>State</label>
                        <input type='text' name='state' id='state' className='form-control' />
                    </div>
                    <div className='mb-3'>
                        <label htmlFor='cuisines'>Cuisines</label>
                        <input
                            type='text'
                            name='cuisines'
                            id='cuisines'
                            className='form-control'
                            required
                        />
                    </div>
                    <div className='mb-3'>
                        <button type='submit' className='btn btn-primary'>
                            Add Place
                        </button>
                    </div>
                </form>
        </Def>
    )
}

module.exports = edit_form
