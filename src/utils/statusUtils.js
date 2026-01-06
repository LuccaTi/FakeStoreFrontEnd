/**
 * Retorna a cor e o texto traduzido para um determinado status de pedido.
 * @param {string} status - O status do pedido (ex: "Confirmed", "Cancelled").
 * @returns {{color: string, text: string}} - Um objeto com a cor e o texto.
 */
export const getStatusProps = (status) => {
  switch (status) {
    case 'Created':
      return { color: 'gray', text: 'Criado' };
    case 'Confirmed':
      return { color: 'blue', text: 'Confirmado' };
    case 'Sent':
      return { color: 'orange', text: 'Enviado' };
    case 'Finished':
      return { color: 'green', text: 'Finalizado' };
    case 'Cancelled':
      return { color: 'red', text: 'Cancelado' };
    default:
      return { color: 'black', text: status }; // Retorna o próprio status se não for mapeado
  }
};