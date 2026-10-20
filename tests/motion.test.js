import test from 'node:test';
import assert from 'node:assert/strict';
import { getMotionProject, motionInquiryHref, publishedMotionProjects } from '../src/content/motion.js';
import { getInquiryContext, validateForm, buildInquiryPayload } from '../src/lib/inquiry.js';

const form = { name: ' Test ', email: 'test@example.com', description: 'A role', organization: '', timeline: '', budget: '', enquiryType: 'Remote-job opportunity', around: '', bringing: '', destinations: [] };
test('only genuine published work resolves; unknown slugs do not', () => {
  assert.equal(publishedMotionProjects.length, 1);
  assert.equal(getMotionProject('draft'), undefined);
  assert.equal(getMotionProject('drag-to-cart').demo.mode, 'external');
});
test('query context is allowlisted and never changes ordinary studio mode', () => {
  assert.deepEqual(getInquiryContext('?service=other&project=drag-to-cart'), { isMotion: false, project: null });
  assert.deepEqual(getInquiryContext('?service=motion&project=unknown'), { isMotion: true, project: null });
  assert.deepEqual(getInquiryContext(motionInquiryHref('drag-to-cart').split('?')[1]), { isMotion: true, project: 'drag-to-cart' });
});
test('motion opportunities do not require studio questions or budget', () => {
  assert.deepEqual(validateForm(form, true), {});
  assert.ok(validateForm(form).around);
  assert.ok(validateForm({ ...form, enquiryType: 'unrecognised' }, true).enquiryType);
  assert.ok(validateForm({ ...form, email: 'invalid' }, true).email);
});
test('motion payload retains context, reply address, and honeypot without studio questions', () => {
  const payload = buildInquiryPayload(form, 'bot', { isMotion: true, project: 'drag-to-cart' });
  assert.equal(payload.Service, 'Motion');
  assert.equal(payload['Enquiry type'], 'Remote-job opportunity');
  assert.match(payload['Related project'], /Drag to Cart/);
  assert.equal(payload._replyto, form.email);
  assert.equal(payload._gotcha, 'bot');
  assert.equal(payload['Your name'], 'Test');
  assert.equal(payload['What are we building around?'], undefined);
});
test('studio payload and required questions are preserved', () => {
  const studio = { ...form, around: 'Brand', bringing: 'An idea', destinations: ['Film / Motion'] };
  assert.deepEqual(validateForm(studio), {});
  const payload = buildInquiryPayload(studio, '');
  assert.equal(payload['Where could it go?'], 'Film / Motion');
  assert.equal(payload.Service, undefined);
});
