const Hebcal = require('hebcal');
const { getVisibleCommunityEvents } = require('./community-events');
const { normalizePublicSubmission } = require('./public-submission');
const {
  EMBED_THUMB_WIDTH,
  buildPhotoThumbUrl,
  toAbsoluteAssetUrl,
} = require('./photo-url');

const HEBREW_MONTHS = [
  '',
  'ניסן',
  'אייר',
  'סיוון',
  'תמוז',
  'אב',
  'אלול',
  'תשרי',
  'חשוון',
  'כסלו',
  'טבת',
  'שבט',
  'אדר',
  'אדר ב',
];

const PUBLIC_BOARD_FIELDS = [
  'slug',
  'name',
  'title',
  'titles',
  'language',
  'location',
  'theme',
  'people',
  'dailyCites',
  'communityEvents',
  'boardFeatures',
  'publicSubmission',
  'memorialQrPanel',
  'weeklyChapterEnabled',
  'shabbatTimesEnabled',
  'reloadTimeout',
  'baseUrl',
];

function slimPublicPerson(person, { includeText = false } = {}) {
  if (!person || typeof person !== 'object') {
    return person;
  }

  const publicPerson = {
    id: person.id,
    name: person.name,
    gregorianDateOfDeath: person.gregorianDateOfDeath,
    photo: person.photo,
    photoCrop: person.photoCrop,
    title: person.title,
  };

  if (includeText) {
    publicPerson.text = person.text || '';
  }

  return publicPerson;
}

function toPublicBoardPayload(board, { includeText = false } = {}) {
  if (!board || typeof board !== 'object') {
    return board;
  }

  const payload = {};

  PUBLIC_BOARD_FIELDS.forEach((field) => {
    if (board[field] !== undefined) {
      payload[field] = board[field];
    }
  });

  payload.people = Array.isArray(board.people)
    ? board.people.map((person) => slimPublicPerson(person, { includeText }))
    : [];

  payload.communityEvents = getVisibleCommunityEvents(board.communityEvents || []);
  payload.publicSubmission = normalizePublicSubmission(board.publicSubmission, board.provisioning);

  return payload;
}

function toPublicPersonPayload(person) {
  return slimPublicPerson(person, { includeText: true });
}

function hebrewDateOfDeathPayload(gregorianDateOfDeath) {
  const death = gregorianDateOfDeath || {};
  if (!death.year || !death.month || !death.date) {
    return { label: '' };
  }

  const hdate = new Hebcal.HDate(new Date(death.year, death.month - 1, death.date));
  const monthName = HEBREW_MONTHS[hdate.getMonth()] || '';
  return {
    year: hdate.getFullYear(),
    month: hdate.getMonth(),
    date: hdate.getDate(),
    label: `${hdate.getDate()} ${monthName} ${hdate.getFullYear()}`.trim(),
  };
}

function toEmbedPersonPayload(person, { origin = '' } = {}) {
  const publicPerson = slimPublicPerson(person, { includeText: false });
  const relativeThumb = publicPerson.photo
    ? buildPhotoThumbUrl(publicPerson.photo, EMBED_THUMB_WIDTH, publicPerson.photoCrop)
    : '';

  return {
    ...publicPerson,
    photoThumbUrl: toAbsoluteAssetUrl(relativeThumb, origin),
    hebrewDateOfDeath: hebrewDateOfDeathPayload(publicPerson.gregorianDateOfDeath),
  };
}

function toPublicPeoplePayload(people, { origin = '' } = {}) {
  return {
    people: Array.isArray(people)
      ? people.map((person) => toEmbedPersonPayload(person, { origin }))
      : [],
  };
}

module.exports = {
  PUBLIC_BOARD_FIELDS,
  slimPublicPerson,
  toPublicBoardPayload,
  toPublicPersonPayload,
  toEmbedPersonPayload,
  toPublicPeoplePayload,
};
