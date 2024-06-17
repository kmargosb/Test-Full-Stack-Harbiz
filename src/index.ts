import { trainers, clients, Client, Trainer } from "./interfaces";

export const sortedClients = clients.sort((a, b) => b.importance - a.importance);
export const sortedTrainers = trainers.sort((a, b) => b.reputation - a.reputation);

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
   return assignments;
}

const createClientSatisfactionTableData = (
   assignments: { client: Client, trainer: Trainer }[],
   maxReputation: number
): { Client: string, 'Satisfaction Percentage': number }[] => {
   const satisfactionTable = assignments.map(({ client, trainer }) => {
      const reputationFactor = (trainer.reputation / maxReputation) * 10;
      const importanceFactor = client.importance;
      const satisfactionPercentage = Math.round((importanceFactor * reputationFactor + (10 - importanceFactor) * 10));

      return {
         Client: client.name,
         'Satisfaction Percentage': satisfactionPercentage
      };
   });
   console.table(satisfactionTable)
   return satisfactionTable;
}

const main = () => {
   const assignments = assignTrainersToClients(sortedClients, sortedTrainers);
   const maxReputation = sortedTrainers.length > 0 ? sortedTrainers[0].reputation : 0;
   createClientSatisfactionTableData(assignments, maxReputation);
}
main();
