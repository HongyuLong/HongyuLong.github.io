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
    
    init() {
        homeVM.fecthAiringToday()
    }
    
    var body: some View {
//        Text("placeholder").padding()
        ScrollView(.vertical) {
            VStack {
                GeometryReader { geometry in
                    CarouselDynamic(numberOfImages: 5) {
                        ForEach(homeVM.airing_today_list, id: \.id) {item in
                            UnitImageDynamicView(item.poster_path)
                                .frame(width: 352, height: 500)
                        }
                    }
                }
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
