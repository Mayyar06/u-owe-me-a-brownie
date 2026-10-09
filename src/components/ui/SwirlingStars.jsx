const stars = Array.from({ length: 32 }, (_, index) => {
  const angle = (index * 137.5 * Math.PI) / 180;
  const radius = 12 + ((index * 17) % 36);

  return {
    left: `${50 + Math.cos(angle) * radius}%`,
    top: `${50 + Math.sin(angle) * radius * 0.8}%`,
    delay: `${(index % 8) * -0.55}s`,
    size: `${index % 7 === 0 ? 3 : index % 3 === 0 ? 2 : 1}px`,
  };
});

export default function SwirlingStars() {
  return (
    <div className="swirling-stars" aria-hidden="true">
      <div className="swirling-stars__orbit swirling-stars__orbit--outer">
        {stars.map((star, index) => (
          <span
            className="swirling-stars__star"
            key={index}
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              animationDelay: star.delay,
            }}
          />
        ))}
      </div>
      <div className="swirling-stars__orbit swirling-stars__orbit--inner">
        {stars.slice(0, 16).map((star, index) => (
          <span
            className="swirling-stars__star swirling-stars__star--pink"
            key={index}
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              animationDelay: star.delay,
            }}
          />
        ))}
      </div>
    </div>
  );
}
