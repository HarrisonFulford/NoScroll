# Hack_GT_NoScroll
# Inspiration
There is an evident short form media epidemic amongst youth all over the world. We, of course, are no exception. Constantly finding ourselves wasting hours at a time through meaningless scrolling, we needed to make a change.

# What it does
A web-app / chrome extension that allows users to block distracting websites under customizable time constraints. The web-app provides support for a wide variety of use-cases not accessible in our current state, such as social media APIs for a messaging aggregate.

# How we built it
We began by creating a Chrome extension to efficiently and naturally track screen time for select websites. Following the customizable time limit for these sites being reached, a popup appears which directs users to take a look at their screen time statistics. We use Chrome’s local storage to save user habits which are then loaded onto the statistics site.

# Challenges we ran into
We initially planned for the statistics website to also be a place where users could send messages through social media apps without distractions like stories, reels, or posts. This would have allowed users to leverage social media’s messaging utility even after they went over their time limit. However, in order to access the API for most social media sites, you have to pay for a developer account or create a workaround, which puts your account at risk of being suspended.

Although this challenge couldn’t be overcome, there was a challenge that we could beat. Following countless hours of unsuccessful attempts at integrating scripts to read and write user information with MongoDB Atlas, we decided to connect the extension and web app without a server.

# Accomplishments that we're proud of
We are proud of our use of local Chrome storage to remove the need for a more complex backend server. The serverless architecture makes the application more efficient and removes the need for us to manage relationships between a database and Chrome extension, which can prove challenging.

# What we learned
We learned a lot about the capabilities of Chrome extensions and the developer tooling provided for them. Having no previous experience working with these extensions, seeing what was and was not able to be done was very interesting. Furthermore, we were not familiar with any of the languages used for this project, so we pride ourselves on how quickly we adapted to their unique syntax and structure.

# What's next for NoScroll
Expanding the use case through building out the message aggregator function on the statistics website is the most clear choice. This will require us to either purchase the API keys for these social media sites or to create a workaround that is sneaky enough to avoid detection and possible account suspensions.
