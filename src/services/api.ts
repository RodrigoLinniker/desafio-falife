import axios from "axios";
import Toast from "react-native-toast-message";
import NetInfo from "@react-native-community/netinfo";

const api = axios.create({
  baseURL: "/api",
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    let message = "Erro desconhecido";

    const netState = await NetInfo.fetch();

    if (!netState.isConnected) {
      message = "Sem conexão com a internet";
    } else if (axios.isAxiosError(error)) {
      if (error.response) {
        message = "Não foi possível carregar as notícias";
      } else {
        message = "Erro de conexão com o servidor";
      }
    } else if (error instanceof Error) {
      message = "Ocorreu um erro inesperado";
    }

    Toast.show({
      type: "error",
      text1: message,
    });

    return Promise.reject(error);
  },
);

export default api;
