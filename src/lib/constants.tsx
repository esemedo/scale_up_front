
export const SACHA_STATUS = [ "Demande d'achat non saisi", "Demande d'achat saisi","Traité dans SACHA par le contrôleur de gestion","Bon de commande retourné"]
export const PRIORITY = [ "Faible", "Moyenne","Haute", "Urgente"]
export const PRIORITY_COLOR= [ "#3FC54C", "#EB9240","#E31C1C", "#E31C1C"]

export const STATUS = ['A faire','En Attente', "Complétée"]
export const STATUS_COLOR_BG = ["white-polar", "#EB9240", "electric-blue"]
export const STATUS_COLOR_TEXT = ["black", "white", "white"]
export const statusConfig: StatusConfig = {
    0: {
      purchaseOrder: true,
      sashaStatus: false,
      totalPrice: true,
      dueDate: true,
      hourlyPrice: true,
      priority: false
    },
    1: {
      purchaseOrder: true,
      sashaStatus: true,
      totalPrice: true,
      dueDate: true,
      hourlyPrice: true,
      priority: true
    },
    2: {
      purchaseOrder: false,
      sashaStatus: false,
      totalPrice: true,
      dueDate: true,
      hourlyPrice: true,
      priority: false
    },
    default: {
      purchaseOrder: true,
      sashaStatus: true,
      totalPrice: true,
      dueDate: true,
      hourlyPrice: true,
      priority: true
    }
  };