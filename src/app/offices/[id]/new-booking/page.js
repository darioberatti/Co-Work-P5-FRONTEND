import NewBooking from "@/components/NewBooking";

export default function NewBookingView({params}) {
  const {id} = params
  console.log("params ---> ", id) 

  return (
    <div>
      <NewBooking id={id}/>
    </div>
  );
}
