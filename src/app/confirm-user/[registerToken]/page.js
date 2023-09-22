
import ConfirmUser from "@/components/ConfirmUser";

export default function ConfirmUserView({params}) {
const registerToken = params.registerToken;

  return (
    <div>
      <ConfirmUser registerToken={registerToken}/>
    </div>
  );
}
