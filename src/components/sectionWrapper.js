export default function Wrapper({
  style = {},
  className = "",
  children,
  id = "",
  childrenClassName = "",
}) {
  return (
    <section id={id} className={className} style={style}>
      <div
        className={`${childrenClassName} px-6  md:px-10 lg:px-8 xl:px-8 xl:max-w-screen-xl mx-auto`}
      >
        {children}
      </div>
    </section>
  );
}
