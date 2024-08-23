import React from 'react'

const Hero = ({title, imageUrl}) => {
  return (
    <>
    <div className="hero container">
      <div className="banner">
        <h1>{title}</h1>
        <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio a, natus voluptatibus voluptates consectetur perferendis fugiat animi repellendus iure fuga praesentium necessitatibus obcaecati porro veniam architecto est quaerat ipsa et. Eligendi, possimus consequuntur animi aut corporis similique molestiae ut, soluta sunt, minus non exercitationem totam mollitia. Reiciendis impedit quis sunt? Cum sunt eligendi quasi ratione quidem, ullam iure sequi. Illo nam perspiciatis voluptatum hic odio nostrum totam sed eaque corrupti pariatur velit, accusamus sint, numquam minima deleniti soluta amet excepturi.
        </p>
      </div>
      <div className="banner">
        <img src={imageUrl} alt="hero" className="animated-image" />
        <span>
          <img src="/Vector.png" alt="vector" />
        </span>
      </div>
    </div>
  </>
  )
}

export default Hero
