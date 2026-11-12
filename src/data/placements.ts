export type Category = 'Consulting' | 'Finance' | 'Technology' | 'Brands & Industry' | 'Graduate School'

export type Firm = { name: string; category: Category }

export const featured = {
  mbb: [
    { name: 'McKinsey & Company', short: 'McKinsey' },
    { name: 'Bain & Company', short: 'Bain' },
    { name: 'Boston Consulting Group', short: 'BCG' },
  ],
  big4: [
    { name: 'Ernst & Young', short: 'EY' },
    { name: 'Deloitte', short: 'Deloitte' },
    { name: 'PricewaterhouseCoopers', short: 'PwC' },
    { name: 'KPMG International', short: 'KPMG' },
  ],
}

export const boutique = [
  'EY-Parthenon',
  'Oliver Wyman',
  'Kearney',
  'Guidehouse',
  'Accenture',
  'Alvarez & Marsal',
  'FTI Consulting',
  'Dalberg',
  'Huron',
  'Mercer',
]

const consulting: Firm[] = [
  ...featured.mbb.map((f) => f.name),
  ...featured.big4.map((f) => f.short),
  ...boutique,
].map((name) => ({ name, category: 'Consulting' }))

export const firms: Firm[] = [
  ...consulting,

  { name: 'Goldman Sachs', category: 'Finance' },
  { name: 'J.P. Morgan', category: 'Finance' },
  { name: 'BlackRock', category: 'Finance' },
  { name: 'Apollo Global Management', category: 'Finance' },
  { name: 'CD&R', category: 'Finance' },
  { name: 'Bank of America', category: 'Finance' },
  { name: 'Lincoln International', category: 'Finance' },
  { name: 'Piper Sandler', category: 'Finance' },
  { name: 'Wells Fargo', category: 'Finance' },
  { name: 'Fidelity', category: 'Finance' },
  { name: 'American Express', category: 'Finance' },
  { name: 'Capital One', category: 'Finance' },
  { name: 'Visa', category: 'Finance' },
  { name: 'Mastercard', category: 'Finance' },

  { name: 'Amazon', category: 'Technology' },
  { name: 'Meta', category: 'Technology' },
  { name: 'Epic Systems', category: 'Technology' },
  { name: 'Oracle NetSuite', category: 'Technology' },
  { name: 'Rocket Lab', category: 'Technology' },
  { name: 'Klaviyo', category: 'Technology' },

  { name: 'A24', category: 'Brands & Industry' },
  { name: 'Chanel', category: 'Brands & Industry' },
  { name: 'PepsiCo', category: 'Brands & Industry' },
  { name: 'Johnson & Johnson', category: 'Brands & Industry' },
  { name: 'Diageo', category: 'Brands & Industry' },
  { name: 'Anheuser-Busch', category: 'Brands & Industry' },
  { name: 'Delta Air Lines', category: 'Brands & Industry' },
  { name: 'Boeing', category: 'Brands & Industry' },
  { name: 'Walmart', category: 'Brands & Industry' },
  { name: 'Marriott', category: 'Brands & Industry' },
  { name: 'NHL', category: 'Brands & Industry' },
  { name: 'Gates Foundation', category: 'Brands & Industry' },
  { name: 'X-energy', category: 'Brands & Industry' },

  { name: 'Wharton', category: 'Graduate School' },
  { name: 'Columbia Business School', category: 'Graduate School' },
  { name: 'Columbia Law School', category: 'Graduate School' },
  { name: 'University of Oxford', category: 'Graduate School' },
  { name: 'HEC Paris', category: 'Graduate School' },
  { name: 'Sciences Po', category: 'Graduate School' },
  { name: 'University of Michigan', category: 'Graduate School' },
  { name: 'UVA', category: 'Graduate School' },
]

export const categories: Category[] = ['Consulting', 'Finance', 'Technology', 'Brands & Industry', 'Graduate School']

export const mbbThisYear = 5
export const big4Total = 23
export const companyTotal = firms.filter((f) => f.category !== 'Graduate School').length
