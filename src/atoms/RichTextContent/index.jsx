import PropTypes from "prop-types"

const RichTextContent = ({ content, className = "" } ) => {
  return <div className={`prose prose-lg overflow-x-auto my-4 max-w-none ${className}`} dangerouslySetInnerHTML={{ __html: content || "<p>Konten tidak tersedia</p>"}} />
}

export default RichTextContent

RichTextContent.propTypes = {
  content: PropTypes.string.isRequired,
  className: PropTypes.string,
};