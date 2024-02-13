const React = require('react');
const Def = require('./layouts/default.jsx');

const Home = () => {
  return (
    <Def>
      <main>
        <h1>HOME</h1>
        <div>
          <img src="/Images/steak-and-fries" alt="steak with fries" />
        </div>
        Photo by <a href='https://unsplash.com/@covertnine'>Tim Toomey</a>  on <a href='https://unsplash.com/photos/grilled-meat-on-white-ceramic-plate-pe9dvM1rQkM'>Unsplash</a>
        <a href='/places'>
          <button className='btn btn-primary'>Places Page</button>
        </a>
      </main>
    </Def>
  );
};

module.exports = Home;
