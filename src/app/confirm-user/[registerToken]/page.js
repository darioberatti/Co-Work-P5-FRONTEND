
import ConfirmUser from "@/components/ConfirmUser";

export default function ConfirmUserView({params}) {
const {registerToken} = params;

  return (
    <div>
      <ConfirmUser registerToken={registerToken}/>
    </div>
  );
}
