import { trainers, clients, Client, Trainer } from "./interfaces";

export const sortClients = (clients: Client[]): Client[] => {
   return clients.sort((a, b) => b.importance - a.importance);
}
export const sortTrainers = (trainers: Trainer[]): Trainer[] => {
   return trainers.sort((a, b) => b.reputation - a.reputation);
}

export const assignTrainersToClients = (
   sortedClients: Client[],
   sortedTrainers: Trainer[]
): { trainer: Trainer, client: Client }[] => {

   const assignments: { trainer: Trainer, client: Client }[] = [];
   const trainerMap: { [key: string]: { trainer: Trainer, clients: string[] } } = {};

   for (const client of sortedClients) {
      const trainer = sortedTrainers.find(trainer => trainer.available > 0);
      if (trainer) {
         if (!trainerMap[trainer.name]) {
            trainerMap[trainer.name] = { trainer, clients: [] };
         }
         trainerMap[trainer.name].clients.push(client.name);
         assignments.push({ trainer, client });
         trainer.available--;
      } else {
         break;
      }
   }

   const table: Object[] = Object.values(trainerMap).map(({ trainer, clients }) => ({
      Trainer: trainer.name,
      'Trainer Reputation': trainer.reputation,
      Clients: clients.join(', ')
   }));

   console.table(table);
   // console.log(assignments);

   return assignments;
}

export const calculateSatisfaction = (client: Client, trainer: Trainer, maxReputation: number): number => {
   const reputationFactor = (trainer.reputation / maxReputation) * 10;
   const importanceFactor = client.importance;
   return Math.round((importanceFactor * reputationFactor + (10 - importanceFactor) * 10));
}

export const createClientSatisfactionTableData = (
   assignments: { client: Client, trainer: Trainer }[],
   maxReputation: number
) => {
   const satisfactionTable = assignments.map(({ client, trainer }) => ({
      Client: client.name,
      'Satisfaction Percentage': calculateSatisfaction(client, trainer, maxReputation)
   }));
   console.table(satisfactionTable)
   return satisfactionTable
}

const main = () => {
   const sortedClients = sortClients(clients);
   const sortedTrainers = sortTrainers(trainers);
   const assignments = assignTrainersToClients(sortedClients, sortedTrainers);
   const maxReputation = sortedTrainers.length > 0 ? sortedTrainers[0].reputation : 0;
   createClientSatisfactionTableData(assignments, maxReputation);
}
main();
