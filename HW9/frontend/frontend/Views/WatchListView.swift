//
//  WatchListView.swift
//  frontend
//
//  Created by Hongyu Long on 2021/4/21.
//

import SwiftUI
import Kingfisher

struct WatchListView: View {
    @ObservedObject var watchlistVM = WatchlistViewModel()
    var body: some View {
        
        VStack {
            if watchlistVM.watchlist.count == 0 {
                Text("Watchlist is empty")
                    .font(.title)
                    .foregroundColor(.secondary)
            }
            else {
                NavigationView {
                    ScrollView(.vertical) {
                        VStack(alignment: .leading) {
                            Text("Watchlist")
                                .font(.title)
                                .bold()
                            ForEach(watchlistVM.watchlist, id: \.id) { item in
                                NavigationLink(destination: DetailsView(media_type: item.media_type, media_id: item.id))  {
                                    KFImage(URL(string: item.poster_path))
                                        .resizable()
                                        .frame(width: 96, height: 130)
                                        .aspectRatio(contentMode: .fit)
                                        .clipped()
                                }
                            }
                            Spacer()
                        }
                    }
                }
                .environmentObject(watchlistVM)
            }
        }
        .onAppear(perform: {
            watchlistVM.readFromLocalStorage()
        })
//
//        NavigationView {
//            if watchlistVM.watchlist.count == 0 {
//                Text("Watchlist is empty")
//                    .font(.title)
//                    .foregroundColor(.secondary)
//            }
//            else {
//                VStack(alignment: .leading) {
//                    Text("Watchlist")
//                        .font(.title)
//                        .bold()
//                    ForEach(watchlistVM.watchlist, id: \.id) { item in
//                        NavigationLink(destination: DetailsView(media_type: item.media_type, media_id: item.id))  {
//                            KFImage(URL(string: item.poster_path))
//                                .resizable()
//                                .frame(width: 96, height: 130)
//                                .aspectRatio(contentMode: .fit)
//                                .clipped()
//                        }
//                    }
//                    Spacer()
//                }
//            }
//        }
//        .onAppear(perform: {
//            watchlistVM.readFromLocalStorage()
//        })
//        .environmentObject(watchlistVM)
        
    }
}
