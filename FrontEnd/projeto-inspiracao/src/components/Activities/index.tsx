import React from 'react';
import { ActivityName, Card, CardsContainer, Container, Image, Title, activities } from './Activities.style'

const ActivitiesList: React.FC = () => {
  return (
    <div id='activities' style={{backgroundColor: '#F5F4F3'}}>
    <Container>
      <Title>Atividades</Title>
      <CardsContainer>
        {activities.map((activity) => (
          <Card key={activity.name}>
            <Image src={activity.image} alt={activity.name} />
            <ActivityName>{activity.name}</ActivityName>
          </Card>
        ))}
      </CardsContainer>
    </Container>
    </div>
  );
};

export default ActivitiesList;