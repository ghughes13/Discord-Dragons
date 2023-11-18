const fetch = require("node-fetch");

const start = (msg) => {
  const playerName = msg.author.username;
  const playerID = msg.author.id;

  console.log(playerID, playerName);
  fetch("https://graphql.fauna.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.FAUNA_SERVER_KEY}`,
    },
    body: JSON.stringify({
      query: `
      mutation createPlayer(
        $playerID: ID!, 
        $playerName: String, 
      ) {
        createPlayer(data: {
          playerID: $playerID, 
          playerName: $playerName, 
          balance: 100
          playerSkills: { 
            create: {
              skillPlayerID: {
                connect: $playerID 
              },
              health: 10
              attack: 1,
              defence: 1,
            }, 
          }
        }) {
          playerID
          playerName 
        }
      }
    `,
      variables: {
        playerID,
        playerName,
      },
    }),
  })
    .then(() => {
      msg.reply("Account Created");
    })
    .catch((err) => console.error(JSON.stringify(err, null, 2)));
};

exports.start = start;
