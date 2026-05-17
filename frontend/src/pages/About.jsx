import aboutMain from "../assets/images/about3.jpg";
import aboutSecondary from "../assets/images/about1.jpg";
import aboutAccent from "../assets/images/about.jpg";

/* --- Structured About page content --- */
const aboutText = [
  {
    title: "Personalised macaron boxes",
    text: `Macarons are typically offered as standardised products with limited personalisation. Sweet Box introduces an interactive system that enables users to construct personalised macaron boxes through direct flavour selection. This approach transfers control to the user, ensuring each final composition reflects individual taste preferences rather than predefined assortments.`,
  },
  {
    title: "Elegant visual experience",
    text: `Sweet Box is defined by elegance, softness, and creative expression. The system combines premium visual design with user-driven choice, ensuring each order achieves a distinct outcome. Flavour selection spans from light, fruit-based profiles to rich combinations, supporting balanced compositions that unify aesthetic presentation with sensory experience.`,
  },
  {
    title: "Support for small bakeries",
    text: `Small bakeries often lack interactive tools for effective product presentation and customisation. This project introduces a structured digital solution that enhances customer experience through an interactive interface for product configuration. The system supports visual presentation and flexible ordering, increasing engagement and usability.`,
  },
];

function About() {
  return (
    <main className="about-page redesigned-about-page">
      <section className="about-hero-layout">
        <div className="about-hero-text">
          <h1>About Sweet Box</h1>
          <p>
            An interactive macaron box customisation system designed to make
            product selection more personal, visual, and user-friendly.
          </p>
        </div>

        <div className="about-image-collage">
          <img src={aboutMain} alt="Macaron bakery display" />
          <img src={aboutSecondary} alt="Macaron product presentation" />
          <img src={aboutAccent} alt="Colourful macarons" />
        </div>
      </section>

      <section className="about-content-grid">
        {aboutText.map((item, index) => (
          <article key={index} className="about-info-card">
            <span>0{index + 1}</span>
            <h2>{item.title}</h2>
            <p>{item.text}</p>
          </article>
        ))}
      </section>
    </main>
  );
}

export default About;
