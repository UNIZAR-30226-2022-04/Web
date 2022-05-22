

export default function separateStories(stories){

    var quick_stories = []
    var tale_stories = []
    console.log(stories)

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
            var type = "quick_twitter"
            if(storie.type == 0){
                type = "quick_random"
            }
            quick_stories.push(
                {
                    id: storie.id, 
                    title: storie.title, 
                    date: storie.date,
                    type: type
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