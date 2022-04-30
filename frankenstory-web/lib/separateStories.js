

export default function separateStories(stories){

    var quick_stories = []
    var tale_stories = []


    stories.stories.map((storie) => {
        if (storie.type == 'tale'){
            tale_stories.push(
                {
                    id: storie.id, 
                    title: storie.title, 
                    date: storie.date
                }
            )
        }else{
            quick_stories.push(
                {
                    id: storie.id, 
                    title: storie.title, 
                    date: storie.date,
                    type: storie.type
                }
            )
        }
    })

    return(
        {
            quick_stories: quick_stories,
            tale_stories: tale_stories
        }
    )
}