//
//  CastsView.swift
//  frontend
//
//  Created by Hongyu Long on 2021/4/23.
//

import SwiftUI
import Kingfisher

struct CastsView: View {
    @EnvironmentObject var detailsVM: DetailsViewModel
    
    var body: some View {
        if detailsVM.hasCasts {
            VStack(alignment: .leading) {
                Text("Cast & Crew")
                    .font(.title2)
                    .bold()
                
                ScrollView(.horizontal) {
                    HStack(alignment: .top) {
                        ForEach(detailsVM.casts) { item in
                            VStack {
                                KFImage(URL(string: item.profile_path))
                                    .resizable()
                                    .frame(width: 96, height: 130)
                                    .aspectRatio(contentMode: .fit)
                                    .clipShape(/*@START_MENU_TOKEN@*/Circle()/*@END_MENU_TOKEN@*/)
                                
                                Text(item.name)
                                    .multilineTextAlignment(.center)
                                    .fixedSize(horizontal: false, vertical: /*@START_MENU_TOKEN@*/true/*@END_MENU_TOKEN@*/)
                            }
                            .frame(width: 96)
                            .padding(.trailing, 5)
                        }
                    }
                }
            }
            .padding(.top, 6)
        }
        
    }
}

