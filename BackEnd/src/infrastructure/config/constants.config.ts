export default {
    STATUS: {
        MESSAGES: {
            STATUS400: "Houve um problema com a sua requisição.",
            STATUS401: "Você não está autorizado a acessar este recurso.",
            STATUS403: "Acesso a este recurso é proibido.",
            STATUS404: "O recurso solicitado não foi encontrado.",
            STATUS500: "Houve um erro ao buscar informações no banco de dados. Por favor, tente novamente mais tarde.",
            
        },
    },
    USERS: {
        MESSAGES: {
            ERROR: {
                USER_UNAUTHENTICATED: "Usuário ou senha incorretos. Usuário não autenticado.",
                USER_ALREADY_EXISTS: "Email {USER_ID} já cadastrado. Usuário já existe.",
                USER_NOT_FOUND: `Usuário {USER_ID} não encontrado`,
                VOID_NAME: `O campo 'Nome' deve ser preenchido`,
                VOID_EMAIL: `O campo 'Email' deve ser preenchido`,
                VOID_PASSWORD: `O campo 'Senha' deve ser preenchido`,
                VOID_BIRTHDATE: `O campo 'Data de Nascimento' deve ser preenchido`,
                STATUS_NOT_TRUE: `Você precisa concordar com os Termos de Uso.`,
            }
        }
    },
    APPOINTMENTS: {
        MESSAGES: {
            ERROR: {
            }
        }
    },
}