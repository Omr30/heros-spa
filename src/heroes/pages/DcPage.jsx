import { HeroList } from '../components'

export const DcPage = () => {
    const publisherList = 'DC Comics'

    return (
        <>
            <h1>{publisherList}</h1>
            <hr />

            <HeroList publisher={publisherList} />
        </>
    )
}
