
import {
   assignTrainersToClients,
   createClientSatisfactionTableData,
   sortClients,
   sortTrainers
} from "./prueba";

import {
   Client,
   Trainer,
} from "./interfaces";

const mockClients: Client[] = [
   { name: "Client A", importance: 5 },
   { name: "Client C", importance: 3 },
   { name: "Client D", importance: 8 },
];

const mockTrainers: Trainer[] = [
   { name: 'A', reputation: 2, available: 1 },
   { name: 'B', reputation: 50, available: 1 },
   { name: 'C', reputation: 1, available: 1 },

];
const sortedClients = sortClients(mockClients);
const sortedTrainers = sortTrainers(mockTrainers);

test("sortClients should sort clients by importance in descending order", () => {
   expect(sortedClients).toStrictEqual([
      { name: "Client D", importance: 8 },
      { name: "Client A", importance: 5 },
      { name: "Client C", importance: 3 },
   ]);
});

test("sortTrainers should sort clients by importance in descending order", () => {
   expect(sortedTrainers).toStrictEqual([
      { name: 'B', reputation: 50, available: 1 },
      { name: 'A', reputation: 2, available: 1 },
      { name: 'C', reputation: 1, available: 1 },
   ]);
});

test("assignTrainersToClients should return an array of objects", () => {
   expect(assignTrainersToClients(sortedClients, sortedTrainers)).toEqual([
      {
         trainer: { name: 'B', reputation: 50, available: 0 },
         client: { name: 'Client D', importance: 8 }
      },
      {
         trainer: { name: 'A', reputation: 2, available: 0 },
         client: { name: 'Client A', importance: 5 }
      },
      {
         trainer: { name: 'C', reputation: 1, available: 0 },
         client: { name: 'Client C', importance: 3 }
      }
   ])
});

test("createClientSatisfactionTableData should return a array pf objects", () => {
   const assignments = assignTrainersToClients(sortedClients, sortedTrainers);
   const maxReputation = sortedTrainers.length > 0 ? sortedTrainers[0].reputation : 0;

   expect(createClientSatisfactionTableData(assignments, maxReputation)).toEqual([
      // { client: 'D', 'Satisfaction Percentage': 100 },
      // { client: 'A', 'Satisfaction Percentage': 52 },
      // { client: 'C', 'Satisfaction Percentage': 71 },
   ])
});
