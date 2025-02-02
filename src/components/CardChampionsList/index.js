import { useEffect, useState, useRef } from "react";

import CardChampion from "../CardChampion";
import championsSummary from "../../services/championsSummary";
import { Wrap } from "@chakra-ui/react";
import ModalFind from "../ModalFind";

function ChampionsCardList(props) {
  const [champions, setChampions] = useState({});
  const [maxChampions, setMaxChampions] = useState(0);
  const [numberHits, setNumberHits] = useState(0);
  const [changeShowChamp, setChangeShowChamp] = useState(false);
  const refChamp = useRef(null);

  useEffect(() => {
    if (maxChampions === 0 || changeShowChamp !== props.showChampion) {
      handlerGetChampionsSummary(props.showChampion);
      setTimeout(() => {
        props.setLoading(false);
      }, 2000);
      setChangeShowChamp(props.showChampion);
    }

    if (props.restartGame) {
      handlerGetChampionsSummary(props.showChampion);
      setNumberHits(0);
      props.setGameOver({ success: false, fail: false });
      props.setRestartGame(false);
      props.setStartGame(false);
    }

    if (numberHits === maxChampions && props.startGame && !props.restartGame) {
      props.setGameOver({ success: true, fail: false });
      props.setStartGame(false);
    }

    if (props.gameOver.fail && props.startGame && !props.restartGame) {
      props.setGameOver({ success: false, fail: true });
      props.setFinalMessage(`Você acertou ${numberHits} de ${maxChampions} campeões.`);
      props.setFinalTitle('Fora de Micão hein posição!');
    }
  }, [maxChampions, champions, changeShowChamp, props, numberHits]);

  const handlerGetChampionsSummary = async (showChamp) => {
    try {
      const response = await championsSummary.get();
      delete response.data[0];
      for (const key in response.data) {
        response.data[key] = {
          ...response.data[key],
          showChamp: showChamp,
          hit: false,
          champImg: `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${response.data[key].alias}_0.jpg`,
          champAudio: `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/pt_br/v1/champion-choose-vo/${response.data[key].id}.ogg`
        };
      }

      let newResponse = response.data;

      let currentIndex = newResponse.length, randomIndex;

      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [newResponse[currentIndex], newResponse[randomIndex]] = [
          newResponse[randomIndex], newResponse[currentIndex]];
      }

      newResponse = newResponse.filter(function (element) {
        return element !== undefined;
      });

      setChampions(newResponse);
      setMaxChampions(Object.keys(response.data).length);
    } catch (err) {
      console.log('ERROR API: ', err);
    }
  };

  return (
    <Wrap
      w={'100%'}
      pt={['16px', '50px']}
      pb={['170px']}
      paddingX={['4px', '20px']}
      justify='center'
      spacing={['16px', '24px']}
      backgroundColor='transparent'
      p={8}
    >
      {
        Object.entries(champions).map(([key, value]) => (
          <CardChampion key={key} {...value} refChamp={refChamp} keyValue={key} />
        ))
      }
      {
        props.startGame &&
        <ModalFind
          maxChampions={maxChampions}
          numberHits={numberHits}
          champions={champions}
          setChampions={setChampions}
          setNumberHits={setNumberHits}
          maxCounter={props.maxCounter}
          refChamp={refChamp}
          setGameOver={props.setGameOver}
          setFinalCounter={props.setFinalCounter}
        />
      }

    </Wrap>
  );
}

export default ChampionsCardList;
