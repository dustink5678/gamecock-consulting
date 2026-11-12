import { asset } from '../lib/asset'

export type Logo = { name: string; src: string; h: number }

const logo = (name: string, file: string, h: number): Logo => ({ name, src: asset(`logos/${file}`), h })

export const logos = {
  google: logo('Google', 'google.svg', 44),
  capgemini: logo('Capgemini', 'capgemini.svg', 56),
  srnl: logo('Savannah River National Laboratory', 'srnl.svg', 46),

  mckinsey: logo('McKinsey & Company', 'mckinsey.svg', 46),
  bain: logo('Bain & Company', 'bain.svg', 24),
  bcg: logo('Boston Consulting Group', 'bcg-mono.svg', 40),
  deloitte: logo('Deloitte', 'deloitte.svg', 32),
  ey: logo('EY', 'ey.svg', 56),
  pwc: logo('PwC', 'pwc.svg', 50),
  accenture: logo('Accenture', 'accenture.svg', 40),
  oliverwyman: logo('Oliver Wyman', 'oliverwyman.svg', 28),
  kearney: logo('Kearney', 'kearney.svg', 24),
  fti: logo('FTI Consulting', 'fti.svg', 36),

  goldman: logo('Goldman Sachs', 'goldman.svg', 46),
  jpmorgan: logo('JPMorgan Chase', 'jpmorgan.svg', 28),
  blackrock: logo('BlackRock', 'blackrock.svg', 30),
  apollo: logo('Apollo Global Management', 'apollo.svg', 28),
  bofa: logo('Bank of America', 'bofa.svg', 34),
  visa: logo('Visa', 'visa.svg', 34),
  mastercard: logo('Mastercard', 'mastercard-mono.svg', 46),

  meta: logo('Meta', 'meta.svg', 36),
  amazon: logo('Amazon', 'amazon.svg', 42),
  a24: logo('A24', 'a24.svg', 42),
  chanel: logo('Chanel', 'chanel.svg', 26),
  boeing: logo('Boeing', 'boeing.svg', 30),
  delta: logo('Delta Air Lines', 'delta.svg', 28),
  pepsico: logo('PepsiCo', 'pepsico.svg', 42),
  wharton: logo('The Wharton School', 'wharton.svg', 48),
  kpmg: logo('KPMG', 'kpmg.svg', 34),
  hsbc: logo('HSBC', 'hsbc.svg', 26),
}
