export interface Trainer {
   name: string;
   reputation: number;
   available: number;
}

export interface Client {
   name: string;
   importance: number;
}

export const trainers: Trainer[] = [
   {
      name: 'A',
      reputation: 4.5,
      available: 1
   },
   {
      name: 'B',
      reputation: 3.2,
      available: 4
   },
   {
      name: 'C',
      reputation: 1.2,
      available: 3
   },
   {
      name: 'D',
      reputation: 3.4,
      available: 2
   },

]

export const clients: Client[] = [
   {
      name: 'q',
      importance: 2.6
   },
   {
      name: 'r',
      importance: 3.7
   },
   {
      name: 's',
      importance: 8.5
   },
   {
      name: 't',
      importance: 9.7
   },
   {
      name: 'u',
      importance: 2.6
   },
   {
      name: 'v',
      importance: 4.7
   },
   {
      name: 'w',
      importance: 5.6
   },
   {
      name: 'x',
      importance: 3.7
   },
   {
      name: 'y',
      importance: 8.1
   },
   {
      name: 'z',
      importance: 2.5
   },
]