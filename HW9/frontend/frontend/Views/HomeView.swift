//
//  HomeView.swift
//  frontend
//
//  Created by Hongyu Long on 2021/4/14.
//

import SwiftUI
import SwiftyJSON
import Kingfisher

struct HomeView: View {
    @ObservedObject var homeVM = HomeViewModel()
    
    var media: String = "movie"
    var title_dynamic: String = "Now Playing"  // when it's tv, it'll be "Trending"
    
    init() {
        homeVM.fetchAiringToday()
        homeVM.fetchTopRatedTv()
        homeVM.fetchPopularTv()
        homeVM.fetchNowPlaying()
        homeVM.fetchTopRatedMovie()
        homeVM.fetchPopularMovie()
    }
    
    var body: some View {
//        Text("placeholder").padding()
        ScrollView(.vertical) {
            VStack(alignment: .leading) {
                Text(title_dynamic)
                    .font(.title2)
                    .bold()
                
                GeometryReader { geometry in
                    CarouselDynamic(numberOfImages: 5) {
                        ForEach(homeVM.airing_today_list, id: \.id) {item in
                            UnitImageDynamicView(item.poster_path)
                        }
                    }
                }
                .frame(height: 300, alignment: .center)
                .clipped()
                
                MediaCardsView(title: "Top Rated", card_list: homeVM.top_rated_tv_list)
            }
            
        }
        .padding()

    }
}

struct HomeView_Previews: PreviewProvider {
    static var previews: some View {
        HomeView()
    }
}
