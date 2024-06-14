
import { sortClients, sortTrainers } from "./index";
import { Client, Trainer } from "./interfaces";

const mockClients: Client[] = [
   { name: "Client A", importance: 5 },
   { name: "Client C", importance: 3 },
   { name: "Client D", importance: 8 },
];

const mockTrainers: Trainer[] = [
   { name: 'A', reputation: 2, available: 3 },
   { name: 'B', reputation: 50, available: 0 },
   { name: 'C', reputation: 1, available: 1 },

];

test("sortClients should sort clients by importance in descending order", () => {
   const sortedClients = sortClients(mockClients);

   expect(sortedClients).toStrictEqual([
      { name: "Client D", importance: 8 },
      { name: "Client A", importance: 5 },
      { name: "Client C", importance: 3 },
   ]);
});

test("sortTrainers should sort clients by importance in descending order", () => {
   const sortedTrainers = sortTrainers(mockTrainers);

   expect(sortedTrainers).toStrictEqual([
      { name: 'B', reputation: 50, available: 0 },
      { name: 'A', reputation: 2, available: 3 },
      { name: 'C', reputation: 1, available: 1 },
   ]);
});
