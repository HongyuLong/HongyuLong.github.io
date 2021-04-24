//
//  SearchCardsView.swift
//  frontend
//
//  Created by Hongyu Long on 2021/4/24.
//

import SwiftUI
import Kingfisher

struct SearchCardsView: View {
    @State private var searchText : String = ""
    @EnvironmentObject var searchVM: SearchViewModel
    
    init(_ text: String) {
        self.searchText = text
    }
    
    var body: some View {
        VStack {
            ForEach(searchVM.search_list) { result in
                ZStack {
                    KFImage(URL(string: result.backdrop_path))
                        .resizable()
                        .frame(width: 350, height: 180)
                        .aspectRatio(contentMode: .fit)
                        .clipped()
                        .cornerRadius(10)
                    
                    VStack {
                        HStack {
                            Text(result.media_type)
                                .font(.title3)
                                .foregroundColor(.white)
                                .bold()
                            if(result.year != "") {
                                Text("(" + result.year + ")")
                                    .font(.title3)
                                    .foregroundColor(.white)
                                    .bold()
                            }
                            Spacer()
                            Image(systemName: "star.fill")
                                .foregroundColor(.red)
                            Text(String(format: "%.1f", result.vote_average))
                                .font(.title3)
                                .foregroundColor(.white)
                                .bold()
                        }
                        Spacer()
                        
                        HStack {
                            Text(result.title)
                                .font(.title3)
                                .foregroundColor(Color.white)
                                .bold()
                                .padding(10)
                            Spacer()
                        }
                    }
                    .frame(height: 180)
                    .clipped()
                }
            }
        }
    }
}

