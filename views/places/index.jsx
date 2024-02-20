const React = require('react');
const Def = require('./layouts/default');

const Index = (data) => {
  let placesFormatted = data.places.map((place) => {
    return (
      <div key={place.name} className='col-sm-6'>
        <h2>
          {/* work here */}
          <a href={`/places/${place.id}`} >{place.name}</a>
          </h2>
        <p>{place.cuisines}</p>
        <img src={place.pic} alt={place.name} />
        <p className='text-center'>
          Located in {place.city}, {place.state}
        </p>
      </div>
    );
  });

  return (
    <Def>
      <main>
        <h1>Places to Rant or Rave About</h1>
        <div className='row'>{placesFormatted}</div>
      </main>
    </Def>
  );
};

module.exports = Index;
