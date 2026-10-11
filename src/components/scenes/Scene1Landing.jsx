import GlowButton from "../ui/GlowButton";
import SwirlingStars from "../ui/SwirlingStars";

export default function Scene1Landing({ onNext }) {
  return (
    <div className="scene landing-scene">
      <SwirlingStars />
      <GlowButton
        text={
          <span
            style={{
              fontFamily: "var(--font-romantic)",
              fontSize: "1.6rem",
            }}
          >
            Happy Birthday Aiman ✨ <br />
            A little reminder of how loved you are, how much you've grown, and how many more memories we have left to make. Here's to your 21st chapter — may it be your best one yet.
          </span>
        }
        onClick={onNext}
      />

      <style>
        {`
          .scene {
            height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
          }
        `}
      </style>
    </div>
  );
}
