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
    @State private var nextShowMovieView = false   // default next show is TV Shows
    @State private var trailingContent: String = "TV shows"
    @State private var carouselTitle: String = "Now Playing"
    @State private var media_type: String = "movie"
    
    @ObservedObject var homeVM = HomeViewModel()
    @ObservedObject var watchlistVM = WatchlistViewModel()
    
    var body: some View {
        
        if homeVM.fetched == false {
            ProgressView("Fetching Data...")
                .onAppear(perform: {
                    homeVM.fetchHomeMovieData()
                })
        }
        else {
            NavigationView {
                ScrollView(.vertical) {
                    VStack() {
                        CarouselView(card_list: homeVM.now_playing_list,
                                     title: self.carouselTitle,
                                     media_type: self.media_type
                        )
                        
                        MediaCardsView(title: "Top Rated",
                                       card_list: homeVM.top_rated_list,
                                       media_type: self.media_type
                        )
                        
                        MediaCardsView(title: "Popular",
                                       card_list: homeVM.popular_list,
                                       media_type: self.media_type
                        )
                        
                    }
                }
                .padding()
                .navigationTitle("USC Films")
                .navigationBarItems(
                    trailing:
                        Button(self.trailingContent){
                            if(nextShowMovieView) {
                                homeVM.fetchHomeMovieData()
                                self.trailingContent = "TV shows"
                                nextShowMovieView = false
                                self.carouselTitle = "Now Playing"
                                self.media_type = "movie"
                            }
                            else {
                                homeVM.fetchHomeTvData()
                                self.trailingContent = "Movies"
                                nextShowMovieView = true
                                self.carouselTitle = "Trending"
                                self.media_type = "tv"
                            }
                        })
                
            }
            .navigationViewStyle(StackNavigationViewStyle())
            .environmentObject(watchlistVM)
        }
    }
}

struct HomeView_Previews: PreviewProvider {
    static var previews: some View {
        HomeView()
    }
}
