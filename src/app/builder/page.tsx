import { makeDefaultState } from '~/state/reducers/formBuilder';
import FormBuilder from './components/FormBuilder';


export default function Home() {
  const state = makeDefaultState();

  return (
    <FormBuilder state={state} />
  )
}