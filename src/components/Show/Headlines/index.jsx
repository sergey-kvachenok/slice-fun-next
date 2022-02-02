import Headline from './Headline'
import { ListWrapper } from 'src/components/shared/containers'

const Headlines = ({ headlines = [] }) => {
    const content = headlines.map((headline) => <Headline key={headline.title} headline={headline} />)

    return (
        <ListWrapper data-testid="headlines" className="margin-top">
            {content}
        </ListWrapper>
    )
}

export default Headlines
