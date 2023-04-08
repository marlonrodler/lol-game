import { CardFooter, Text, Card, WrapItem } from '@chakra-ui/react';
import questionImg from '../../assets/imgs/question-invert.png';

function CardChampion({ showChamp, name, alias, hit, refChamp, keyValue, id }) {

  const champImg = `http://ddragon.leagueoflegends.com/cdn/img/champion/loading/${alias}_0.jpg`;

  return (
    <WrapItem
      justifyContent={'space-between'}
      pt={'8px'}
      transition='all 0.5s ease'
      _hover={(showChamp || hit) ? { transform: ['', 'scale(1.1)'] } : ''}
      ref={(champ) => { refChamp[keyValue] = champ }}
    >
      <Card
        backgroundImage={(showChamp || hit) ? `url(${champImg})` : `url(${questionImg})`}
        backgroundColor={(showChamp || hit) ? 'transparent' : '#2A2A2A'}
        backgroundRepeat='no-repeat'
        backgroundSize={(showChamp || hit) ? 'cover' : '200px'}
        backgroundPosition='center center'
        overflow={'hidden'}
        w={['140px', '180px']}
        h={['390px', '400px']}
        align='center'
        justifyContent={'end'}
        border={showChamp ? '' : '1px solid #927345'}
        transition={hit ? 'transform 0.6s' : ''}
        transform={(hit || showChamp) ? 'rotateY(0deg)' : 'rotateY(180deg)'}
        _hover={{ border: '1px solid #927345' }}
      >
        <CardFooter
          w={'100%'}
          justifyContent={'center'}
          borderTop={'1px solid rgb(146, 115, 69)'}
          backgroundColor={'rgba(10, 10, 12, 0.9)'}
          display={hit ? 'flex' : 'none'}
          flexDirection={'column'}
        >
          <Text align={'center'} fontSize='md' color={'rgb(146, 115, 69)'}>{name.toUpperCase()}</Text>
        </CardFooter>
      </Card>
    </WrapItem>

  )
}

export default CardChampion;