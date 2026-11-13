import { asset } from '../lib/asset'

export type Competition = {
  slug: string
  name: string
  short: string
  host: string
  city: string
  country: string
  coords: string
  result?: string
  sponsor?: string
  image: string
  imageAlt: string
  /** Display frame width / height; caps how wide the photo can stretch. */
  frame: number
  /** CSS object-position used when cropping into the frame. */
  focus: string
}

const img = (file: string) => asset(`images/competitions/${file}`)

export const international: Competition[] = [
  {
    slug: 'nhh-1st',
    name: 'NHH International Case Competition',
    short: 'NHHICC',
    host: 'Norwegian School of Economics (Norges Handelshøyskole)',
    city: 'Bergen',
    country: 'Norway',
    coords: '60.42° N, 5.30° E',
    result: '1st Place',
    image: img('nhh-1st.jpg'),
    imageAlt: 'GCC team holding the first-place trophy at the NHH International Case Competition',
    frame: 16 / 9,
    focus: '50% 35%',
  },
  {
    slug: 'tu-dublin',
    name: 'TU Dublin Case Competition',
    short: 'TU Dublin',
    host: 'Technological University Dublin',
    city: 'Dublin',
    country: 'Ireland',
    coords: '53.35° N, 6.28° W',
    result: '1st Place',
    image: img('tu-dublin.jpg'),
    imageAlt: 'GCC team wearing first-place medals at the TU Dublin case competition',
    frame: 3 / 2,
    focus: '50% 8%',
  },
  {
    slug: 'nhh-2nd',
    name: 'NHH International Case Competition',
    short: 'NHHICC',
    host: 'Norwegian School of Economics (Norges Handelshøyskole)',
    city: 'Bergen',
    country: 'Norway',
    coords: '60.42° N, 5.30° E',
    result: '2nd Place',
    image: img('nhh-2nd.jpg'),
    imageAlt: 'GCC team holding the second-place trophy at the NHH International Case Competition',
    frame: 3 / 2,
    focus: '50% 30%',
  },
  {
    slug: 'hkicc',
    name: 'Hong Kong International Case Competition',
    short: 'HKICC',
    host: 'Hong Kong University of Science and Technology',
    city: 'Hong Kong',
    country: 'China',
    coords: '22.34° N, 114.27° E',
    sponsor: 'HSBC',
    image: img('hkicc.jpg'),
    imageAlt: 'GCC team at the HKUST International Case Competition in Hong Kong',
    frame: 4 / 3,
    focus: '50% 40%',
  },
  {
    slug: 'sibc',
    name: 'Sydney International Business Competition',
    short: 'SIBC',
    host: 'International undergraduate case competition',
    city: 'Sydney',
    country: 'Australia',
    coords: '33.86° S, 151.21° E',
    image: img('sibc.jpg'),
    imageAlt: 'GCC team in front of the Sydney Opera House',
    frame: 4 / 3,
    focus: '50% 50%',
  },
]

export const alsoCompeted = ['Canada', 'Spain', 'Germany', 'and more']
