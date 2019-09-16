def getMinimumDifference(a, b):
    output = []
    print(a,b)
    for i in range(len(a)):
        a_dict = defaultdict(int)
        b_dict = defaultdict(int)
        if len(a[i])!=len(b[i]):
            return output.append(-1)
        else:
            num_differences = 0
            for k in a[i]:
                a_dict[k]+=1
            for k in b[i]:
                b_dict[k]+=1
            print(a_dict,b_dict)
            for k,v in a_dict.items():
                if v>b_dict[k]:
                    num_differences+=v-b_dict[k]
                print(v,b_dict[k])
            output.append(num_differences)
    print(output)
    return output

print(getMinimumDifference())