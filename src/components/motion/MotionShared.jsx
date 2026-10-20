import { Link } from 'react-router-dom';
import preview from '../../assets/motion/drag-to-cart-preview.jpg';
import { startProject } from '../../content/startProject.js';
import { motionInquiryHref } from '../../content/motion.js';

export function LiveLink({ project }) {
  return <a className="text-link" href={project.demo.url} target="_blank" rel="noopener noreferrer">Try Live Experience <span aria-hidden="true">↗</span><span className="visually-hidden"> (opens in a new tab)</span></a>;
}

export function MotionPreview({ eager = false }) {
  return <figure className="motion-preview"><img src={preview} width="1440" height="1120" loading={eager ? 'eager' : 'lazy'} decoding="async" alt="Drag to Cart live app: a wireless headphones product card beside a shopping bag drop zone, with Add to bag and Reset controls." /><figcaption className="text-label">Drag to Cart / Screenshot of the live experiment</figcaption></figure>;
}

export function MotionContact({ slug }) {
  return <section className="motion-contact section-inverse site-section--loose" aria-labelledby="motion-contact-title"><div className="container-wide editorial-grid motion-split"><div><p className="text-label section-kicker">Work with me</p><h2 id="motion-contact-title">Let’s make<br />the next move.</h2></div><div className="motion-copy"><p>Have an interaction to bring to life, a freelance brief, or a contract or remote role to discuss?</p><Link className="text-link" to={motionInquiryHref(slug)}>{slug ? 'Discuss a similar project' : 'Send a motion enquiry'} <span aria-hidden="true">↗</span></Link><a className="motion-email" href={`mailto:${startProject.delivery.recipient}`}>{startProject.delivery.recipient}</a></div></div></section>;
}
