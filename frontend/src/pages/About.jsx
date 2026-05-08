import aboutImg from "../assets/images/about.jpg";

/* --- Structured content used in the About section --- */
const aboutText = [
  `Macarons are typically offered as standardised products with limited
  personalisation. Sweet Box introduces an interactive system that enables
  users to construct personalised macaron boxes through direct flavour
  selection. This approach transfers control to the user, ensuring each final
  composition reflects individual taste preferences rather than predefined
  assortments.`,

  `Sweet Box is defined by elegance, softness, and creative expression.
  The system combines premium visual design with user-driven choice,
  ensuring each order achieves a distinct outcome. Flavour selection spans
  from light, fruit-based profiles to rich combinations, supporting balanced
  compositions that unify aesthetic presentation with sensory experience.`,

  `Small bakeries often lack interactive tools for effective product
  presentation and customisation. This project introduces a structured
  digital solution that enhances customer experience through an interactive
  interface for product configuration. The system supports visual presentation
  and flexible ordering, increasing engagement and usability.`,
];

function About() {
  return (
    <div className="about-page">
      <div className="about-container">
        {/* --- Text content section --- */}
        <div className="about-text-card">
          <h1>About Sweet Box</h1>

          {aboutText.map((paragraph, index) => (
            <p key={index} className="text-justify">
              {paragraph}
            </p>
          ))}
        </div>

        {/* --- Supporting visual content --- */}
        <div className="about-image-wrap">
          <img
            src={aboutImg}
            alt="Sweet Box macaron presentation"
            className="about-image"
          />
        </div>
      </div>
    </div>
  );
}

export default About;
