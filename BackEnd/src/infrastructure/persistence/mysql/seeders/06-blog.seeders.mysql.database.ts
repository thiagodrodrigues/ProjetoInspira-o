import * as Sequelize from 'sequelize';

export default {
  up: (queryInterface: Sequelize.QueryInterface) => {
    return queryInterface.bulkInsert('blogs', [
      {
        idBlog: 1,
        idUser: 2,
        title: "Os benefícios da fisioterapia",
        text: `A fisioterapia desempenha um papel fundamental na recuperação e melhoria da qualidade de vida de indivíduos com diferentes condições de saúde. Seus benefícios são vastos e impactam positivamente aspectos físicos, emocionais e funcionais dos pacientes.

        Em primeiro lugar, a fisioterapia é essencial para reabilitar lesões musculares, articulares ou ósseas. Através de exercícios específicos e técnicas de mobilização, os fisioterapeutas ajudam a restaurar a funcionalidade e a amplitude de movimento, reduzindo a dor e a rigidez muscular, permitindo que os pacientes recuperem a independência em suas atividades diárias.
        
        Além disso, a fisioterapia contribui para a prevenção de problemas de saúde. Por meio de programas de exercícios personalizados, orientações ergonômicas e educação sobre postura correta, os fisioterapeutas capacitam os pacientes a adotar hábitos saudáveis, prevenindo a ocorrência de lesões recorrentes e o desenvolvimento de condições crônicas.
        
        Outro benefício significativo da fisioterapia é seu impacto emocional e psicológico. O processo terapêutico não se limita apenas ao físico; ele também promove o bem-estar mental. A interação com profissionais capacitados, o apoio emocional oferecido durante a reabilitação e a sensação de progresso e superação podem contribuir para a melhoria da autoestima e qualidade de vida dos pacientes.
        
        Por fim, a fisioterapia desempenha um papel crucial na promoção da saúde global, não apenas tratando lesões ou condições existentes, mas também trabalhando na prevenção, educação e manutenção da saúde a longo prazo. Esse campo multidimensional tem um impacto holístico, promovendo o bem-estar físico e emocional dos indivíduos, capacitando-os a viver uma vida mais saudável e funcional.`,
        pictureMain: "http://exemplo.com.br",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idBlog: 2,
        idUser: 2,
        title: "Gameterapia",
        text: `A gameterapia, ou terapia através de jogos, é uma abordagem inovadora e eficaz que integra jogos e tecnologia no campo da fisioterapia, promovendo a reabilitação e o tratamento de pacientes. Essa modalidade terapêutica utiliza-se de jogos digitais ou atividades lúdicas para motivar e engajar os pacientes em seus processos de recuperação.

        Primeiramente, a gameterapia oferece uma forma envolvente e divertida de realizar exercícios e atividades terapêuticas. Através de dispositivos interativos, como videogames ou aplicativos especializados, os pacientes são incentivados a realizar movimentos específicos ou atividades físicas, tornando o processo de reabilitação mais agradável e motivador. Isso pode aumentar a adesão ao tratamento, já que os pacientes se sentem mais engajados e entusiasmados em participar das sessões terapêuticas.
        
        Além disso, a gameterapia é altamente adaptável e pode ser personalizada para atender às necessidades individuais de cada paciente. Os jogos podem ser ajustados de acordo com o nível de habilidade, capacidade física e objetivos terapêuticos de cada indivíduo. Essa personalização permite que os fisioterapeutas criem programas de reabilitação mais eficazes e específicos para cada caso, maximizando os resultados do tratamento.
        
        Outro benefício significativo da gameterapia é sua capacidade de monitorar o progresso dos pacientes de forma mais precisa e detalhada. Através dos dados coletados durante as sessões de jogo, os profissionais de saúde podem acompanhar o desempenho do paciente, avaliar sua evolução e ajustar o plano de tratamento conforme necessário. Isso proporciona uma abordagem mais objetiva e baseada em evidências para a reabilitação.
        
        Em suma, a gameterapia representa uma revolução na abordagem fisioterapêutica, oferecendo uma maneira inovadora, personalizada e motivadora de reabilitação. Ao combinar tecnologia e entretenimento, essa modalidade terapêutica não apenas auxilia na recuperação física dos pacientes, mas também promove um ambiente terapêutico mais estimulante e eficaz.`,
        pictureMain: "http://exemplo.com.br",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        idBlog: 3,
        idUser: 2,
        title: "Eletroterapia",
        text: `Os tratamentos fisioterápicos que envolvem o uso de eletrodos ou choques elétricos são conhecidos como eletroterapia, uma técnica que utiliza correntes elétricas controladas para estimular os músculos e nervos dos pacientes. Essa abordagem terapêutica tem sido amplamente utilizada na fisioterapia devido aos seus benefícios e à capacidade de promover a recuperação e a redução da dor em diversos casos.

        Primeiramente, a eletroterapia é eficaz na redução da dor. As correntes elétricas aplicadas pelos eletrodos podem bloquear os sinais de dor transmitidos ao cérebro, proporcionando alívio temporário para diferentes tipos de dor, como dores musculares, articulares ou neuropáticas. Além disso, a eletroterapia pode estimular a liberação de substâncias naturais analgésicas no organismo, contribuindo para uma diminuição geral da sensação de dor.
        
        Além do controle da dor, a eletroterapia é capaz de promover a recuperação muscular. A estimulação elétrica pode fortalecer os músculos enfraquecidos devido a lesões, cirurgias ou condições médicas. Ela também pode ser utilizada para evitar a atrofia muscular em pacientes que estão impossibilitados de realizar exercícios físicos convencionais, mantendo a força e a função muscular durante a recuperação.
        
        Outro aspecto relevante da eletroterapia é sua capacidade de melhorar a circulação sanguínea local. Ao estimular os músculos e tecidos, as correntes elétricas podem aumentar o fluxo sanguíneo na área tratada, facilitando a entrega de nutrientes e oxigênio, e ajudando na remoção de resíduos metabólicos, acelerando assim o processo de cicatrização.
        
        Em resumo, os tratamentos fisioterápicos com eletrodos ou choques têm um papel valioso na fisioterapia, proporcionando alívio da dor, promovendo a recuperação muscular e melhorando a circulação sanguínea. No entanto, é importante ressaltar que esses tratamentos devem ser realizados sob orientação profissional qualificada para garantir sua segurança e eficácia, adaptando-se às necessidades individuais de cada paciente.`,
        pictureMain: "http://exemplo.com.br",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },
  down: (queryInterface: Sequelize.QueryInterface) => {
    return queryInterface.bulkDelete('blogs', {});
  },
};