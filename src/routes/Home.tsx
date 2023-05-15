import { MediumText, SmallText } from '../components/TextStyles';

export default function Home() {
  return (
    <main>
      <p>
        <MediumText>
          Welcome To Da Chat <SmallText inline={true}>Beta v0.0.1</SmallText>
        </MediumText>
      </p>
      <p>
        <MediumText>Update v0.1.0: Added Global Chat</MediumText>
      </p>
    </main>
  );
}
