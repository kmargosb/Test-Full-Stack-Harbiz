// import { trainers, clients, Client, Trainer } from "./interfaces";

// const sortedClients: Client[] = clients.sort((a, b) => b.importance - a.importance);
// const sortedTrainers: Trainer[] = trainers.sort((a, b) => b.reputation - a.reputation);

// const assignments: { client: Client, trainer: Trainer }[] = [];

// for (const client of sortedClients) {
//    const trainer = sortedTrainers.find(trainerAvailable => trainerAvailable.available > 0);
//    if (trainer) {
//       assignments.push({ client, trainer });
//       trainer.available--;
//    } else {
//       break;
//    }
// }

// const tableData: Object = assignments.map(({ client, trainer }) => ({
//    Client: client.name,
//    'Client Importance': client.importance,
//    Trainer: trainer.name,
//    'Trainer Reputation': trainer.reputation,
// }));

// console.table(tableData);

import { trainers, clients, Client, Trainer } from "./interfaces";

export const sortClients = (clients: Client[]): Client[] => {
   return clients.sort((a, b) => b.importance - a.importance);
}

export const sortTrainers = (trainers: Trainer[]): Trainer[] => {
   return trainers.sort((a, b) => b.reputation - a.reputation);
}

export const assignTrainersToClients = (sortedClients: Client[], sortedTrainers: Trainer[]): { client: Client, trainer: Trainer }[] => {
   const assignments: { client: Client, trainer: Trainer }[] = [];

   for (const client of sortedClients) {
      const trainer = sortedTrainers.find(trainerAvailable => trainerAvailable.available > 0);
      if (trainer) {
         assignments.push({ client, trainer });
         trainer.available--;
      } else {
         break;
      }
   }

   return assignments;
}

export const createTableData = (assignments: { client: Client, trainer: Trainer }[]): Object[] => {
   return assignments.map(({ client, trainer }) => ({
      Client: client.name,
      'Client Importance': client.importance,
      Trainer: trainer.name,
      'Trainer Reputation': trainer.reputation,
   }));
}

console.table(createTableData(assignTrainersToClients(sortClients(clients), sortTrainers(trainers))))



