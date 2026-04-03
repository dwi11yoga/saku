export default function walletColor(color) {
  var background, hover;
  switch (color) {
    case "yellow":
      background = "bg-custom-yellow/10";
      hover = "hover:bg-custom-yellow/20";
      break;
    case "red":
      background = "bg-custom-red/20";
      hover = "hover:bg-custom-red/40";
      break;
    case "blue":
      background = "bg-custom-blue/15";
      hover = "hover:bg-custom-blue/25";
      break;
    case "brown":
      background = "bg-custom-brown/20";
      hover = "hover:bg-custom-brown/40";
      break;
    case "purple":
      background = "bg-custom-purple/15";
      hover = "hover:bg-custom-purple/25";
      break;
    default:
      background = "bg-custom-green/10";
      hover = "hover:bg-custom-green/20";
      break;
  }

  return { background: background, hover: hover };
}
