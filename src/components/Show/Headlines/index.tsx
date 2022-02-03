// components
import Headline from './Headline'
import { ListWrapper } from 'src/components/shared/containers'
// constants
import { HeadlineType } from 'src/constants/types'

type HeadlineProps = {
    headlines: HeadlineType[]
}

const Headlines = ({ headlines = [] }: HeadlineProps) => {
    const content = headlines.map((headline) => <Headline key={headline.title} headline={headline} />)

    return <ListWrapper className="margin-top">{content}</ListWrapper>
}

export default Headlines
